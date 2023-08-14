
interface LanguageState {

    language: "en" | "zh";
    languageList: { name: string, code: string }[];
}

const defaultLangState: LanguageState = {

    language: "en",
    languageList: [{ name: "English", code: "en" }, { name: "中文", code: "zh" }]
}

export default (state = defaultLangState, action) => {


    return state;

}