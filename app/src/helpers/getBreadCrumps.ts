import { setBredCrumps } from "store/slices/WindowSlice";


export function getBredCrumps(title: string, subTitle: string, subSubTitle?: string) {
    console.log(title, subTitle, subSubTitle);

    return [
        {
            title: title,
        },
        {
            title: subTitle,
            href: '',
        },
        {
            title: subSubTitle ? subSubTitle : '',
            href: '',
        }
    ]

}