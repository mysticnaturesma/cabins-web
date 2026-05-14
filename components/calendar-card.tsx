"use client";

import { useEffect, useMemo, useState } from "react";
import type { CabinConfig } from "@/lib/site-data";
import type { CalendarCell } from "@/lib/calendar";

const calendarTimeZone = "America/Argentina/Salta";

type CalendarMonthSnapshot = {
  key: string;
  label: string;
  cells: CalendarCell[];
};

type CalendarCardProps = {
  cabin: CabinConfig;
  months: CalendarMonthSnapshot[];
};

function getCurrentMonthKey() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: calendarTimeZone,
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";

  return `${year}-${month}`;
}

export function CalendarCard({ cabin, months }: CalendarCardProps) {
  const defaultMonthKey = useMemo(() => {
    const currentKey = getCurrentMonthKey();
    const match = months.find((month) => month.key === currentKey);

    return match?.key ?? months[0]?.key ?? currentKey;
  }, [months]);

  const [selectedMonthKey, setSelectedMonthKey] = useState(defaultMonthKey);
  const currentMonth = months.find((month) => month.key === selectedMonthKey) ?? months[0];

  useEffect(() => {
    setSelectedMonthKey(defaultMonthKey);
  }, [defaultMonthKey]);

  return (
    <article className="calendar-card">
      <div className="calendar-card-head">
        <div className="calendar-title">{cabin.name}</div>
      </div>

      <label className="calendar-month-picker">
        <span className="calendar-month-picker-label">Mes</span>
        <span className="calendar-month-picker-value">
          <select
            className="calendar-month-select"
            value={selectedMonthKey}
            onChange={(event) => setSelectedMonthKey(event.target.value)}
            aria-label={`Seleccionar mes para ${cabin.name}`}
          >
            {months.map((month) => (
              <option key={`${cabin.name}-${month.label}`} value={month.key}>
                {month.label}
              </option>
            ))}
          </select>
          <span className="calendar-month-caret" aria-hidden="true">
            ▾
          </span>
        </span>
      </label>

      <div className="calendar-weekdays" aria-hidden="true">
        {["L", "M", "M", "J", "V", "S", "D"].map((label) => (
          <span key={`${cabin.name}-${label}`}>{label}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {currentMonth.cells.map((cell, index) => (
          <div
            key={`${cabin.name}-${selectedMonthKey}-${index}`}
            className={`calendar-day${cell ? ` calendar-day--${cell.state}` : " is-empty"}`}
            aria-hidden="true"
          >
            {cell?.day ? <span>{cell.day}</span> : null}
          </div>
        ))}
      </div>

      <div className="calendar-legend" aria-hidden="true">
        <span className="legend-item">
          <i className="legend-swatch legend-swatch--available" />
          Disponible
        </span>
        <span className="legend-item">
          <i className="legend-swatch legend-swatch--reserved" />
          Reservado
        </span>
        <span className="legend-item">
          <i className="legend-swatch legend-swatch--turnover" />
          Cambio
        </span>
      </div>
    </article>
  );
}
