import { Skeleton } from "antd"
import { FC } from "react"

const HeaderSceleton: FC = () => {
    const arrray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    return (<>
        {
            arrray.map((item) => <Skeleton.Input active size={'default'} />)
        }
    </>)
}
export default HeaderSceleton   