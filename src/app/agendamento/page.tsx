"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

// Tipos
interface Service {
  id: string;
  name: string;
  durationMin: number;
  priceCents: number;
}

interface Booking {
  id: string;
  customerName: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  dateISO: string; // yyyy-MM-dd
  startMinutes: number; // minutos a partir de 00:00
  endMinutes: number;
  notes?: string;
  remindWhatsApp: boolean;
}

// Mock de serviços (poderá vir do backend no futuro)
const SERVICES: Service[] = [
  { id: "corte", name: "Corte de Cabelo", durationMin: 40, priceCents: 4500 },
  { id: "barba", name: "Barba", durationMin: 30, priceCents: 3500 },
  { id: "combo", name: "Corte + Barba", durationMin: 70, priceCents: 7500 },
];

// Configuração de horário de funcionamento (poderá ser multi-barbearia no futuro)
const OPEN_MINUTES = 9 * 60; // 09:00
const CLOSE_MINUTES = 19 * 60; // 19:00
const SLOT_STEP = 10; // minutos entre slots de início (granularidade)

// Utils
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const toHHMM = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const overlaps = (
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number
) => aStart < bEnd && bStart < aEnd;

const phoneRegexBR = /^(\+?55)?\s?(\(?\d{2}\)?)?\s?9?\d{4}-?\d{4}$/;

const schema = z.object({
  serviceId: z.string().min(1, "Selecione um serviço"),
  date: z.string().min(1, "Selecione a data"), // yyyy-MM-dd
  time: z.string().min(1, "Selecione o horário"), // HH:mm
  customerName: z.string().min(2, "Informe seu nome"),
  phone: z
    .string()
    .min(10, "Informe um telefone válido")
    .regex(phoneRegexBR, "Telefone inválido"),
  notes: z.string().optional(),
  remindWhatsApp: z.boolean().default(true),
});

type FormValues = z.infer<typeof schema>;

// LocalStorage helpers (placeholder até backend)
const STORAGE_KEY = "barbershop:bookings";

const loadBookings = (): Booking[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
};

const saveBooking = (booking: Booking) => {
  if (typeof window === "undefined") return;
  const current = loadBookings();
  const next = [...current, booking];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export default function AgendamentoPage() {
  const [existing, setExisting] = useState<Booking[]>([]);
  const [success, setSuccess] = useState<Booking | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceId: "",
      date: "",
      time: "",
      customerName: "",
      phone: "",
      notes: "",
      remindWhatsApp: true,
    },
  });

  const selectedServiceId = watch("serviceId");
  const selectedDate = watch("date");

  useEffect(() => {
    // Carrega agendamentos existentes
    setExisting(loadBookings());
  }, []);

  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === selectedServiceId) || null,
    [selectedServiceId]
  );

  const sameDayBookings = useMemo(() => {
    if (!selectedDate) return [] as Booking[];
    return existing.filter((b) => b.dateISO === selectedDate);
  }, [existing, selectedDate]);

  const timeOptions = useMemo(() => {
    // Gera slots possíveis considerando duração do serviço e conflitos do dia
    const duration = selectedService?.durationMin ?? 0;
    if (!duration) return [] as { value: string; label: string; disabled?: boolean }[];

    const lastStart = CLOSE_MINUTES - duration;
    const options: { value: string; label: string; disabled?: boolean }[] = [];

    for (let start = OPEN_MINUTES; start <= lastStart; start += SLOT_STEP) {
      const end = start + duration;
      const hasConflict = sameDayBookings.some((b) =>
        overlaps(start, end, b.startMinutes, b.endMinutes)
      );
      const value = toHHMM(start);
      options.push({
        value,
        label: `${toHHMM(start)} - ${toHHMM(end)}`,
        disabled: hasConflict,
      });
    }
    return options;
  }, [selectedService, sameDayBookings]);

  const onSubmit = async (values: FormValues) => {
    const service = SERVICES.find((s) => s.id === values.serviceId)!;
    const startMinutes = toMinutes(values.time);
    const endMinutes = startMinutes + service.durationMin;

    // Verificar conflito imediatamente antes de salvar
    const conflict = sameDayBookings.some((b) =>
      overlaps(startMinutes, endMinutes, b.startMinutes, b.endMinutes)
    );
    if (conflict) {
      alert("Este horário acabou de ser reservado. Escolha outro, por favor.");
      return;
    }

    const booking: Booking = {
      id: crypto.randomUUID(),
      customerName: values.customerName,
      phone: values.phone,
      serviceId: service.id,
      serviceName: service.name,
      dateISO: values.date,
      startMinutes,
      endMinutes,
      notes: values.notes,
      remindWhatsApp: values.remindWhatsApp,
    };

    // Placeholder: salvar localmente (até integrar API/backend)
    saveBooking(booking);
    setExisting((prev) => [...prev, booking]);
    setSuccess(booking);
    reset({
      serviceId: "",
      date: "",
      time: "",
      customerName: "",
      phone: "",
      notes: "",
      remindWhatsApp: true,
    });
  };

  const waLink = useMemo(() => {
    if (!success) return "";
    const d = success.dateISO;
    const start = toHHMM(success.startMinutes);
    const msg = encodeURIComponent(
      `Olá ${success.customerName}! Lembramos seu horário na barbearia para ${format(new Date(d + "T00:00:00"), "dd/MM/yyyy")} às ${start} (${success.serviceName}). Até breve!`
    );
    const phone = success.phone.replace(/\D/g, "");
    const withCountry = phone.startsWith("55") ? phone : `55${phone}`;
    return `https://wa.me/${withCountry}?text=${msg}`;
  }, [success]);

  return (
    <div className="min-h-screen w-full py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Agende seu <span className="text-gradient-gold">Horário</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Escolha o serviço, data e horário desejados. Enviaremos um lembrete no
            WhatsApp uma hora antes do atendimento.
          </p>
        </div>

        <div className="card-premium rounded-2xl p-8 shadow-premium-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-3">Serviço</label>
              <select
                className="input-premium w-full rounded-xl px-4 py-3 text-white"
                {...register("serviceId")}
              >
                <option value="">Selecione um serviço...</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {s.durationMin}min — R${" "}
                    {(s.priceCents / 100).toFixed(2)}
                  </option>
                ))}
              </select>
              {errors.serviceId && (
                <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.serviceId.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Data</label>
                <input
                  type="date"
                  min={format(new Date(), "yyyy-MM-dd")}
                  className="input-premium w-full rounded-xl px-4 py-3 text-white"
                  {...register("date")}
                />
                {errors.date && (
                  <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-3">Horário</label>
                <select
                  className="input-premium w-full rounded-xl px-4 py-3 text-white disabled:opacity-50"
                  disabled={!selectedService || !selectedDate}
                  {...register("time")}
                >
                  <option value="">Selecione um horário...</option>
                  {timeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                      {opt.label} {opt.disabled ? "— Indisponível" : ""}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.time.message}
                  </p>
                )}
                {!selectedService && (
                  <p className="text-xs text-neutral-400 mt-2">Selecione um serviço para ver os horários.</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Seu nome</label>
                <input
                  type="text"
                  placeholder="Ex.: João Silva"
                  className="input-premium w-full rounded-xl px-4 py-3 text-white"
                  {...register("customerName")}
                />
                {errors.customerName && (
                  <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.customerName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-3">WhatsApp</label>
                <input
                  type="tel"
                  placeholder="(11) 91234-5678"
                  className="input-premium w-full rounded-xl px-4 py-3 text-white"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.phone.message}
                  </p>
                )}
                <p className="text-xs text-neutral-400 mt-2">
                  Usaremos este número para enviar lembrete do agendamento.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">Observações (opcional)</label>
              <textarea
                rows={3}
                placeholder="Preferências, observações, etc."
                className="input-premium w-full rounded-xl px-4 py-3 text-white resize-none"
                {...register("notes")}
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-white cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-2 border-accent-gold/30 bg-transparent checked:bg-accent-gold checked:border-accent-gold focus:ring-2 focus:ring-accent-gold/20" 
                {...register("remindWhatsApp")} 
              />
              <span>Enviar lembrete por WhatsApp uma hora antes</span>
            </label>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-premium w-full py-4 rounded-xl text-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Agendando...
                  </>
                ) : (
                  <>
                    Confirmar Agendamento
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {success && (
          <div className="mt-8 card-premium rounded-2xl p-6 border-accent-gold/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Agendamento Confirmado!</h2>
            </div>
            <div className="bg-neutral-800/50 rounded-xl p-4 mb-4">
              <p className="text-white text-lg mb-2">
                <strong>{success.customerName}</strong>, seu horário foi agendado:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-neutral-300">{format(new Date(success.dateISO + "T00:00:00"), "dd/MM/yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-neutral-300">{toHHMM(success.startMinutes)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="text-neutral-300">{success.serviceName}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-accent-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-300 text-sm">Você receberá um lembrete no WhatsApp quando essa função estiver ativa.</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-accent-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div className="text-neutral-300 text-sm">
                  Para testar agora: 
                  <a className="text-accent-gold hover:text-accent-gold-dark ml-1 underline" href={waLink} target="_blank" rel="noreferrer">
                    Enviar mensagem no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Horários Reservados
          </h3>
          {!selectedDate ? (
            <div className="card-premium rounded-xl p-6 text-center">
              <svg className="w-12 h-12 text-neutral-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-neutral-400">Selecione uma data para visualizar os horários reservados.</p>
            </div>
          ) : sameDayBookings.length === 0 ? (
            <div className="card-premium rounded-xl p-6 text-center">
              <svg className="w-12 h-12 text-accent-gold mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-neutral-400">Nenhum horário reservado nesta data. Todos os horários estão disponíveis!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sameDayBookings
                .slice()
                .sort((a, b) => a.startMinutes - b.startMinutes)
                .map((b) => (
                  <div key={b.id} className="card-premium rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent-gold/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {toHHMM(b.startMinutes)} - {toHHMM(b.endMinutes)}
                        </p>
                        <p className="text-neutral-400 text-sm">{b.serviceName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{b.customerName}</p>
                      <p className="text-neutral-500 text-sm">{b.phone}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
