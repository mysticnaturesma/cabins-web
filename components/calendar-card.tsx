"use client";

import { useEffect, useMemo, useState } from "react";
import type { CabinConfig } from "@/lib/site-data";
import type { CalendarCell } from "@/lib/calendar";

type CalendarMonthSnapshot = {
  key: string;
  label: string;
  cells: CalendarCell[];
};

type CalendarCardProps = {
  cabin: CabinConfig;
  months: CalendarMonthSnapshot[];
  defaultMonthKey: string;
};

export function CalendarCard({ cabin, months, defaultMonthKey }: CalendarCardProps) {
  const defaultMonthIndex = useMemo(() => {
    const matchIndex = months.findIndex((month) => month.key === defaultMonthKey);

    return matchIndex >= 0 ? matchIndex : 0;
  }, [defaultMonthKey, months]);

  const [selectedMonth, setSelectedMonth] = useState(defaultMonthIndex);
  const currentMonth = months[selectedMonth] ?? months[0];

  useEffect(() => {
    setSelectedMonth(defaultMonthIndex);
  }, [defaultMonthIndex]);

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
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(Number(event.target.value))}
            aria-label={`Seleccionar mes para ${cabin.name}`}
          >
            {months.map((month, index) => (
              <option key={`${cabin.name}-${month.label}`} value={index}>
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
            key={`${cabin.name}-${selectedMonth}-${index}`}
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
