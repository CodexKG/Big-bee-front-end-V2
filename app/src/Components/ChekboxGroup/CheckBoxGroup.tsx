import { Button, Checkbox } from "antd";
import { FC, useEffect, useState } from "react";
import classes from './CheckBoxGroup.module.scss'
import { useAppDispatch, useAppSelector } from "store/hook";
import { addAttribute, removeValue, setAtribute } from "store/slices/WindowSlice";
import { useQuery } from "helpers/params";
import { useLocation } from "react-router-dom";
import { CheckboxValueType } from "antd/es/checkbox/Group";
type CheckboxOption = {
    key: string;
    value: string;
};
const parsToCheckboxValue = (array: CheckboxOption[]) => {
    const newArray = []
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        newArray.push(element.value)
    }
    return newArray;
}
interface ExpandableCheckboxGroupProps {
    options: string[];
    title: string
}
const ExpandableCheckboxGroup: FC<ExpandableCheckboxGroupProps> = ({ options, title }) => {
    const query = useQuery();
    const dispatch = useAppDispatch()
    const [expanded, setExpanded] = useState(false);
    const selectedValues = useAppSelector((state) => state.window.filters.attribute)
    const [checkedValues, setCheckedValues] = useState<any>([]);


    const visibleOptions = expanded ? options : options.slice(0, 5);

    const onChange = (checkedList: CheckboxValueType[]) => {
        // Формируем список ключей, которые уже выбраны для этой категории
        const selectedKeys = selectedValues
            .filter((item: CheckboxOption) => item.key === title)
            .map((item: CheckboxOption) => item.value);

        // Удаляем все значения для этой категории
        selectedKeys.forEach((value: any) => {
            dispatch(removeValue({ key: title, value }));
        });

        // Теперь добавляем обратно только те, что были выбраны
        checkedList.forEach(value => {
            dispatch(addAttribute({ key: title, value: String(value) }));
        });
    };

    return (
        <div>
            <Checkbox.Group value={parsToCheckboxValue(selectedValues)} onChange={onChange} style={{ flexDirection: 'column', gap: '12px' }}>
                {visibleOptions.map(option => (
                    <Checkbox className={classes.Checkbox} key={option} value={option}>
                        {option}
                    </Checkbox>
                ))}
            </Checkbox.Group>
            {options.length > 5 && (
                <Button className={classes.btn} onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Скрыть' : 'Посмотреть еще'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.03774 11.2156C8.95888 11.3078 8.86098 11.3818 8.75077 11.4326C8.64057 11.4834 8.52067 11.5097 8.39934 11.5097C8.278 11.5097 8.15811 11.4834 8.0479 11.4326C7.9377 11.3818 7.8398 11.3078 7.76094 11.2156L4.54794 7.46667C4.4433 7.34467 4.37586 7.1952 4.35363 7.03601C4.3314 6.87682 4.35531 6.71459 4.42253 6.56859C4.48974 6.42258 4.59743 6.29892 4.73281 6.21229C4.8682 6.12566 5.0256 6.07969 5.18634 6.07983L11.6123 6.07983C11.7729 6.07982 11.9301 6.12584 12.0654 6.21243C12.2006 6.29902 12.3082 6.42256 12.3753 6.56841C12.4425 6.71426 12.4665 6.87631 12.4444 7.03536C12.4223 7.19442 12.3551 7.34381 12.2507 7.46583L9.0369 11.2156H9.03774Z" fill="#005BFF" />
                    </svg>
                </Button>
            )}
        </div>
    );
};
export default ExpandableCheckboxGroup