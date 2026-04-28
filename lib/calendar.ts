export type CalendarState = "available" | "reserved" | "turnover";

type BusyRange = {
  startKey: string;
  endKey: string;
};

export type CalendarCell = {
  day: number;
  state: CalendarState;
};

function parseIcsDate(value: string) {
  const trimmed = value.trim();

  if (/^\d{8}$/.test(trimmed)) {
    const year = Number(trimmed.slice(0, 4));
    const month = Number(trimmed.slice(4, 6)) - 1;
    const day = Number(trimmed.slice(6, 8));
    return new Date(Date.UTC(year, month, day));
  }

  if (/^\d{8}T\d{6}Z$/.test(trimmed)) {
    const year = Number(trimmed.slice(0, 4));
    const month = Number(trimmed.slice(4, 6)) - 1;
    const day = Number(trimmed.slice(6, 8));
    const hour = Number(trimmed.slice(9, 11));
    const minute = Number(trimmed.slice(11, 13));
    const second = Number(trimmed.slice(13, 15));
    return new Date(Date.UTC(year, month, day, hour, minute, second));
  }

  return null;
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function unfoldIcsLines(ics: string) {
  return ics.replace(/\r?\n[ \t]/g, "");
}

export function parseBusyRanges(ics: string): BusyRange[] {
  const lines = unfoldIcsLines(ics).split(/\r?\n/);
  const events: BusyRange[] = [];
  let pendingStart: Date | null = null;
  let pendingEnd: Date | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      pendingStart = null;
      pendingEnd = null;
      continue;
    }

    if (line === "END:VEVENT") {
      if (pendingStart && pendingEnd) {
        events.push({
          startKey: toDateKey(pendingStart),
          endKey: toDateKey(pendingEnd),
        });
      }
      pendingStart = null;
      pendingEnd = null;
      continue;
    }

    const [nameWithParams, rawValue] = line.split(":", 2);

    if (!rawValue) {
      continue;
    }

    const [name] = nameWithParams.split(";");

    if (name === "DTSTART") {
      const parsed = parseIcsDate(rawValue);
      if (parsed) {
        pendingStart = parsed;
      }
      continue;
    }

    if (name === "DTEND") {
      const parsed = parseIcsDate(rawValue);
      if (parsed) {
        pendingEnd = parsed;
      }
      continue;
    }

    if (name === "DURATION" && pendingStart) {
      const daysMatch = rawValue.match(/^P(?:(\d+)D)?$/);
      if (daysMatch) {
        const days = Number(daysMatch[1] ?? "1");
        pendingEnd = new Date(pendingStart.getTime() + days * 24 * 60 * 60 * 1000);
      }
      continue;
    }
  }

  return events;
}

export function buildCalendarCells(baseDate: Date, busyRanges: BusyRange[]): CalendarCell[] {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstDayOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstDayOffset + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const day = index - firstDayOffset + 1;

    if (day < 1 || day > daysInMonth) {
      return { day: 0, state: "available" as CalendarState };
    }

    const dayKey = toDateKey(new Date(Date.UTC(year, month, day)));
    const isReserved = busyRanges.some((range) => dayKey >= range.startKey && dayKey < range.endKey);
    const isCheckIn = busyRanges.some((range) => dayKey === range.startKey);

    return {
      day,
      state: isReserved ? (isCheckIn ? "turnover" : "reserved") : "available",
    };
  });
}
