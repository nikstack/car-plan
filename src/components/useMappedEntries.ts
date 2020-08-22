import React, {useState} from 'react';
import Entry from "../model/Entry";
import DateUtils from "./general/DateUtils";


type EntryMap = { [key: string]: Entry[] };

interface Props {
    entries: Entry[];
}

export default function useMappedEntries({entries}: Props): [EntryMap,
    (entry: Entry) => void,
    (entry: Entry) => void,
    (entry: Entry) => void] {

    const [mappedEntries, setMappedEntries] = useState<EntryMap>(() => {
        const mapObject: EntryMap = {};
        entries.forEach((entry: Entry) => {
            DateUtils.forEachDay(entry.dateFrom, entry.dateTo, (day, dayTimestamp) => {
                if (!mapObject.hasOwnProperty(getMapKey(dayTimestamp))) {
                    mapObject[getMapKey(dayTimestamp)] = [];
                }
                mapObject[getMapKey(dayTimestamp)].push(entry);
            })
        });
        return mapObject;
    });

    const addMappedEntry = (entry: Entry) => {
        const mapObject: EntryMap = {};
        DateUtils.forEachDay(entry.dateFrom, entry.dateTo, (day, dayTimestamp) => {
            if (!mapObject.hasOwnProperty(getMapKey(dayTimestamp))) {
                mapObject['t_' + dayTimestamp] = [];
            }
            mapObject['t_' + dayTimestamp].push(entry);
        });
        setMappedEntries(mappedEntries => ({...mappedEntries, ...mapObject}));
    }

    const deleteMappedEntry = (entry: Entry) => {
        let mapObject = mappedEntries;
        DateUtils.forEachDay(entry.dateFrom, entry.dateTo, (day, dayTimestamp) => {
            mapObject["t_" + dayTimestamp] = mapObject[getMapKey(dayTimestamp)].filter((e) => (e.id != entry.id));
        });
        setMappedEntries(mapObject);
    }

    const updateMappedEntry = (entry: Entry) => {
        deleteMappedEntry(entry);
        addMappedEntry(entry);
    }

    const getMapKey = (timestamp: number) => "t_" + timestamp;

    return [mappedEntries, addMappedEntry, updateMappedEntry, deleteMappedEntry];
}