export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      } as const;
    return new Intl.DateTimeFormat('en-AU', options).format(date);
  }
  