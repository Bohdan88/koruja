import React, {useContext} from 'react';
import {
    Header,
    Tab,
    Image
} from 'semantic-ui-react';
import './style.scss';
import TabContent from './Components/';

import botex from '../../../assets/botex.jpg';
import banner from '../../../assets/banner.jpg';
import LangContext from '../../../context/LangContext';


const createPanes = products => {
    return [
        {
            menuItem: products.tabNames.cosmetology,
            render: () => <Tab.Pane attached={false}><TabContent context={products}/></Tab.Pane>,
        },
        {
            menuItem: products.tabNames.lifting,
            render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
        },
        {
            menuItem: products.tabNames.cosmetics,
            render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
        },
        {
            menuItem: products.tabNames.other,
            render: () => <Tab.Pane attached={false}>Tab 4 Content</Tab.Pane>,
        },
    ]
};

const Products = () => {
    const {products} = useContext(LangContext).currentLangData;
    return (
        <div id="products">
            <Header
                textAlign='center'
                className='header-products'
                as='h2'>
                {products.header}
            </Header>
            <div className="products-tab">
                <Tab
                    menu={{secondary: true}}
                    panes={createPanes(products)}
                />
            </div>
        </div>
    );
};

export default Products;
