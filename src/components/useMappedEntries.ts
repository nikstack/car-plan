import {useEffect, useState} from 'react';
import Entry from "../model/Entry";
import DateUtils from "./general/DateUtils";
import axios from "axios";
import GP from "../GP";

type EntryMap = { [key: string]: Entry[] };

export default function useMappedEntries(): {
    mappedEntries: EntryMap;
    getDayEntries: (day: Date) => (Entry[]);
    updateMappedEntry: (oldEntry: Entry, newEntry: Entry) => void;
    addMappedEntry: (entry: Entry) => void;
    deleteMappedEntry: (entry: Entry) => void
} {

    const [mappedEntries, setMappedEntries] = useState<EntryMap>({});

    useEffect(() => {
        async function fetchData() {
            const {data} = await axios.get<Entry[]>(GP.getBaseServerURL() + '?k=' + GP.getKey());

            const mapObject: EntryMap = {};

            data.forEach((entry: Entry) => {
                const newEntry = Entry.plainToEntry(entry);
                DateUtils.forEachDay(DateUtils.getDayDatetime(newEntry.dateFrom), DateUtils.getDayDatetime(newEntry.dateTo),
                    (day, dayTimestamp) => {
                        const key = getMapKey(dayTimestamp);
                        if (!mapObject.hasOwnProperty(key)) {
                            mapObject[key] = [];
                        }
                        mapObject[key].push(newEntry);
                    })
            });

            setMappedEntries(mapObject);
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, []);

    const addMappedEntry = (entry: Entry) => {
        setMappedEntries(_addMappedEntry(entry, mappedEntries));
    }

    const _addMappedEntry = (entry: Entry, mapObject: EntryMap) => {
        DateUtils.forEachDay(DateUtils.getDayDatetime(entry.dateFrom), DateUtils.getDayDatetime(entry.dateTo),
            (day, dayTimestamp) => {
                const key = getMapKey(dayTimestamp);
                if (!mapObject.hasOwnProperty(key)) {
                    mapObject[key] = [];
                }
                mapObject[key].push(entry);
            });
        return {...mapObject};
    }

    const deleteMappedEntry = (entry: Entry) => {
        setMappedEntries(_deleteMappedEntry(entry, mappedEntries));
    }

    const _deleteMappedEntry = (entry: Entry, mapObject: EntryMap) => {
        DateUtils.forEachDay(DateUtils.getDayDatetime(entry.dateFrom), DateUtils.getDayDatetime(entry.dateTo),
            (day, dayTimestamp) => {
                const key = getMapKey(dayTimestamp);
                mapObject[key] = mapObject[key].filter((e: Entry) => (e.id !== entry.id));
            });
        return {...mapObject};
    }

    const updateMappedEntry = (oldEntry: Entry, newEntry: Entry) => {
        const mapObject = _deleteMappedEntry(oldEntry, mappedEntries);
        setMappedEntries(_addMappedEntry(newEntry, mapObject));
    }

    const getDayEntries = (day: Date) => {
        const key = getMapKey(DateUtils.getDayDatetime(day).getTime());
        if (mappedEntries.hasOwnProperty(key)) {
            return mappedEntries[key];
        }
        return [];
    }

    const getMapKey = (timestamp: number) => "t_" + timestamp;

    return {mappedEntries, getDayEntries, addMappedEntry, updateMappedEntry, deleteMappedEntry};
}