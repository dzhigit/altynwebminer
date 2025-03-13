import { H3Event, getCookie } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
    const user = getCookie(event, 'tgUser')
    return user ? JSON.parse(user) : null
})
