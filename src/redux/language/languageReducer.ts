import i18n from "i18next";
import { CHANGE_LANGUAGE, LanguageActionTypes } from "./languageActions";


export interface LanguageState {

    language: "en" | "zh";
    languageList: { name: string, code: string }[];
}

const defaultLangState: LanguageState = {

    language: "en",
    languageList: [
        { name: "English", code: "en" },
        { name: "中文", code: "zh" }]
}

export default (state = defaultLangState, action: LanguageActionTypes) => {

    switch (action.type) {
        case CHANGE_LANGUAGE:
            //Change language here, but it is not that good, 
            //because it violates the requirement of pure function 
            i18n.changeLanguage(action.payload);
            return { ...state, language: action.payload };//Immutable
        default:
            return state;
    }
}