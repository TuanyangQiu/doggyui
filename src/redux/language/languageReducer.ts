import i18n from "i18next";



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

export default (state = defaultLangState, action) => {

    switch (action.type) {
        case "change_language":
            //Change language here, but it is not that good, 
            //because it violates the requirement of pure function 
            i18n.changeLanguage(action.payload);
            return { ...state, language: action.payload };//Immutable
        default:
            return state;
    }
}