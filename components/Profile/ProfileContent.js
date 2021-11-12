import React from 'react';
import OrdersGrid from './OrdersGrid';
import EmptyOrders from './EmptyOrders';
import EmptyLikes from './EmptyLikes';


const ProfileContent = ({ myOrdersTab, orders, handleGoToOrdersFeed, loggedInUserProfile }) => {

    if (orders.length > 0) {
        return (
            <OrdersGrid
                orders={orders}
                handleGoToOrdersFeed={handleGoToOrdersFeed}
            />
        );
    } else if (myOrdersTab) {
        return <EmptyOrders showPostPrompt={loggedInUserProfile} />;
    } else {
        return <EmptyLikes />;
    }
};

export default ProfileContent;