import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Characteristic } from '../models/characteristic';

type CharacteristicContextType = {
  loading: boolean;
  edibilities?: Array<Characteristic>;
  functionalities?: Array<Characteristic>;
  layers?: Array<Characteristic>;
  sunPreferences?: Array<Characteristic>;
  soilPreferences?: Array<Characteristic>;
  climates?: Array<Characteristic>;
  // TODO: set zone model
  zones?: Array<{}>;
};
export const CharacteristicContext =
  React.createContext<CharacteristicContextType>({ loading: false });

// provides all the values for categories
export const CharcteristicContextProvider: React.FC = (props) => {
  const [loading, setLoading] = useState(true); // indicates that the data is loading
  const [edibilities, setEdibilities] = useState();
  const [functionalities, setFunctionalities] = useState();
  const [layers, setLayers] = useState();
  const [sunPreferences, setSunPreferences] = useState();
  const [soilPreferences, setSoilPreferences] = useState();
  const [climates, setClimates] = useState();
  const [zones, setZones] = useState();

  // load the items
  useEffect(() => {
    (async () => {
      const promises: Array<Promise<unknown>> = [];
      // edibilities
      promises.push(
        axios.get(`/edibilities`).then(({ data }) => setEdibilities(data))
      );
      // functionalities
      promises.push(
        axios
          .get(`/functionalities`)
          .then(({ data }) => setFunctionalities(data))
      );
      // layers
      promises.push(axios.get(`/layers`).then(({ data }) => setLayers(data)));
      // sun preferences
      promises.push(
        axios
          .get(`/sun-preferences`)
          .then(({ data }) => setSunPreferences(data))
      );
      // soil preferences
      promises.push(
        axios.get(`/soils`).then(({ data }) => setSoilPreferences(data))
      );
      // climates
      promises.push(
        axios.get(`/climates`).then(({ data }) => setClimates(data))
      );
      // climates
      promises.push(axios.get(`/zones`).then(({ data }) => setZones(data)));
      await Promise.all(promises);
      setLoading(false);
    })();
  }, []);

  const value = {
    loading,
    edibilities,
    functionalities,
    layers,
    sunPreferences,
    soilPreferences,
    climates,
    zones
  };

  return (
    <CharacteristicContext.Provider value={value} {...props}>
      {/* pass value to immediate children */}
      {/* @ts-ignore */}
      {props.children}
    </CharacteristicContext.Provider>
  );
};
