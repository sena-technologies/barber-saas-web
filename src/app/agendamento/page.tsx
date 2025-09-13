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
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">Agende seu horário</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Escolha o serviço, data e horário desejados. Enviaremos um lembrete no
          WhatsApp (opcional) uma hora antes do atendimento quando integrado ao backend.
        </p>

        <div className="mt-8 rounded-lg border border-neutral-200 p-5 shadow-sm bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Serviço</label>
              <select
                className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                {...register("serviceId")}
              >
                <option value="">Selecione...</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {s.durationMin}min — R${" "}
                    {(s.priceCents / 100).toFixed(2)}
                  </option>
                ))}
              </select>
              {errors.serviceId && (
                <p className="text-sm text-red-600 mt-1">{errors.serviceId.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Data</label>
                <input
                  type="date"
                  min={format(new Date(), "yyyy-MM-dd")}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                  {...register("date")}
                />
                {errors.date && (
                  <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Horário</label>
                <select
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                  disabled={!selectedService || !selectedDate}
                  {...register("time")}
                >
                  <option value="">Selecione...</option>
                  {timeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                      {opt.label} {opt.disabled ? "— Indisponível" : ""}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-sm text-red-600 mt-1">{errors.time.message}</p>
                )}
                {!selectedService && (
                  <p className="text-xs text-neutral-500 mt-1">Selecione um serviço para ver os horários.</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Seu nome</label>
                <input
                  type="text"
                  placeholder="Ex.: João Silva"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                  {...register("customerName")}
                />
                {errors.customerName && (
                  <p className="text-sm text-red-600 mt-1">{errors.customerName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">WhatsApp</label>
                <input
                  type="tel"
                  placeholder="(11) 91234-5678"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                )}
                <p className="text-xs text-neutral-500 mt-1">
                  Usaremos este número para enviar lembrete do agendamento.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Observações (opcional)</label>
              <textarea
                rows={3}
                placeholder="Preferências, observações, etc."
                className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                {...register("notes")}
              />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="size-4" {...register("remindWhatsApp")} />
              Enviar lembrete por WhatsApp uma hora antes (quando disponível)
            </label>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white shadow hover:bg-black/90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Agendando..." : "Confirmar agendamento"}
              </button>
            </div>
          </form>
        </div>

        {success && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <h2 className="font-medium text-green-900">Agendamento realizado!</h2>
            <p className="text-sm text-green-900/90 mt-1">
              {success.customerName}, seu horário foi agendado para {format(new Date(success.dateISO + "T00:00:00"), "dd/MM/yyyy")} às {toHHMM(success.startMinutes)} ({success.serviceName}).
            </p>
            <ul className="text-sm text-green-900/90 mt-3 list-disc pl-5 space-y-1">
              <li>Você receberá um lembrete no WhatsApp quando essa função estiver ativa no backend.</li>
              <li>
                Para testar manualmente agora, use este link:
                {" "}
                <a className="underline" href={waLink} target="_blank" rel="noreferrer">
                  Enviar mensagem no WhatsApp
                </a>
              </li>
            </ul>
          </div>
        )}

        <div className="mt-10">
          <h3 className="text-lg font-medium">Horários já reservados neste dia</h3>
          {!selectedDate ? (
            <p className="text-sm text-neutral-600 mt-1">Selecione uma data para visualizar.</p>
          ) : sameDayBookings.length === 0 ? (
            <p className="text-sm text-neutral-600 mt-1">Nenhum horário reservado nesta data.</p>
          ) : (
            <ul className="mt-2 divide-y divide-neutral-200 border border-neutral-200 rounded-md overflow-hidden">
              {sameDayBookings
                .slice()
                .sort((a, b) => a.startMinutes - b.startMinutes)
                .map((b) => (
                  <li key={b.id} className="flex items-center justify-between px-3 py-2 bg-white">
                    <div>
                      <p className="text-sm font-medium">
                        {toHHMM(b.startMinutes)} - {toHHMM(b.endMinutes)} • {b.serviceName}
                      </p>
                      <p className="text-xs text-neutral-600">{b.customerName} — {b.phone}</p>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
