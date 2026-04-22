type LogMeta = Record<string, unknown>;

function format(level: string, message: string, meta?: LogMeta) {
  const time = new Date().toISOString();

  if (meta) {
    console.log(`[${time}] [${level}] ${message}`, meta);
  } else {
    console.log(`[${time}] [${level}] ${message}`);
  }
}

export const logger = {
  info(message: string, meta?: LogMeta) {
    format("INFO", message, meta);
  },

  warn(message: string, meta?: LogMeta) {
    format("WARN", message, meta);
  },

  error(metaOrMsg: unknown, message?: string) {
    if (message) {
      format("ERROR", message, { error: metaOrMsg });
    } else {
      format("ERROR", String(metaOrMsg));
    }
  },

  debug(message: string, meta?: LogMeta) {
    if (process.env.NODE_ENV !== "production") {
      format("DEBUG", message, meta);
    }
  }
};
