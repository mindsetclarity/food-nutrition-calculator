/** JSON for an inline <script>: `<` is escaped so user text like "</script>" cannot end the tag. */
export const serializeJsonLd = (data: unknown): string => JSON.stringify(data).replace(/</g, '\\u003c');
