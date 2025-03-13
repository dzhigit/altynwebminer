import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
    const country = event.node.req.headers['cf-ipcountry'] || 'Unknown';
    return { country };
});
