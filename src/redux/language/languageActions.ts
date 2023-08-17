export const CHANGE_LANGUAGE = "change_language";


interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE,
    payload: "en" | "zh"
}

export const changeLanguageActionCreator = (langCode: "en" | "zh"): ChangeLanguageAction => {
    return { type: CHANGE_LANGUAGE, payload: langCode };
}

export type LanguageActionTypes = ChangeLanguageAction;
