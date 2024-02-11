import { Flex } from 'antd';
import classes from './CompanyListComponent.module.scss'
import { company_list } from 'data/companyList/companyList';
import React, {useEffect} from 'react'

interface Props {
    
}
 
const CompanyListComponent: React.FC<Props> = () => {
    return ( 
       <div className={classes.company__list}>
            <Flex className={classes.container}>
                {
                    company_list.map(e=>{
                        return(
                            <Flex align='center' justify='center' className={classes.company__list_item} key={e.id}>
                                <img src={e.image} alt="" />
                            </Flex>
                        )
                    })
                }
            </Flex>
       </div>
    );
}
 
export default CompanyListComponent;