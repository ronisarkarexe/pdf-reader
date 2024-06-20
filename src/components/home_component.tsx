"use client";
import React, { useState } from "react";
import HeroSection from "./hero";
import ViewListFile from "./view_list";

const HomeComponent = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <div>
      <HeroSection setIsUpdate={setIsUpdate} />
      <ViewListFile isUpdate={isUpdate} />
    </div>
  );
};

export default HomeComponent;
