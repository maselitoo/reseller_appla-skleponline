// Ten plik ładuje .env PRZED wszystkim innym
// Wymagane bo ES Modules hoistują importy
import { config } from 'dotenv'
import { join } from 'path'

config({ path: join(process.cwd(), '.env') })

// Teraz uruchom serwer
await import('./server.js')
