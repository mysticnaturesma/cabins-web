# cabins-web

Landing en Next.js 14 para publicar dos cabañas, con:

- sección hero
- cards de cada cabaña
- calendario iCal / Airbnb
- mapa
- galería de fotos
- botón de WhatsApp

Notas:

- Los datos editables se cargan desde variables de entorno `NEXT_PUBLIC_*`
- Copiá [.env.example](/Users/vadimwerefkin/Documents/New%20project/cabins-web/.env.example) a `.env.local` o configuralos en Vercel
- La ubicación exacta está lista para reemplazarse por el mapa real
- Para la segunda cabaña no se recibió el link público de Airbnb, así que quedó como opcional

Variables recomendadas para Vercel:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_MAP_LINK`
- `NEXT_PUBLIC_TINY_HOME_AIRBNB_URL`
- `NEXT_PUBLIC_TINY_HOME_SYNC_URL`
- `NEXT_PUBLIC_TINY_HOME_ICAL_URL`
- `NEXT_PUBLIC_CABANA_AIRBNB_URL`
- `NEXT_PUBLIC_CABANA_SYNC_URL`
- `NEXT_PUBLIC_CABANA_ICAL_URL`
