export const STORAGE_KEYS = {
  DARK_MODE: 'abacus_dark_mode',
  LEARNING_PATH: 'abacus_learning_path',
  PROGRESS: 'abacus_progress',
  DAILY_LOGS: 'abacus_daily_logs',
  COINS: 'abacus_coins',
  STREAK: 'abacus_streak',
  PERSONAL_BEST: 'abacus_personal_best',
  CLASS_REMINDERS: 'abacus_class_reminders',
  FOCUS_MODE: 'abacus_focus_mode',
} as const;

// Hour of day (0-23, local time) at which the daily class reminder fires
export const CLASS_REMINDER_HOUR = 17;
