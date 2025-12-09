import React from 'react';
import { IoMdMenu } from "react-icons/io";
import classe from './LowerHeader.module.css';
const LowerHeader = () => {
    return (
      <section>
        <ul className={classe.lowerHeader_container}>
          <li className={classe.menu_items}>
            <IoMdMenu />

            <p>All</p>
          </li>
          <li>Today's Deals</li>
          <li>Customer Service</li>
          <li>Registry</li>
          <li>Gift Cards</li>
          <li>Sell</li>
        </ul>
      </section>
    );
}

export default LowerHeader;
