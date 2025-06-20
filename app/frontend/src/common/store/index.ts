import { useI18nState, useI18nAction } from './language/language.selector';
import { useThemeAction, useThemeState } from './theme/theme.selector';
import { useGameActions, useGameState } from './game/game.selector';
// theme
export { useThemeAction, useThemeState };

// language
export { useI18nState, useI18nAction };

// game

export { useGameActions, useGameState };
