export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'de-DE',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const mapRoomType = (type: string) => {
  switch (type) {
    case 'SINGLE':
      return 'Einzelzimmer';
    case 'DOUBLE':
      return 'Doppelzimmer';
    case 'SUITE':
      return 'Suite';
    default:
      return type;
  }
};
