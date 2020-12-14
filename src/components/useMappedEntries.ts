import {useEffect, useState} from 'react';
import Entry from "../model/Entry";
import DateUtils from "../utils/DateUtils";
import axios from "axios";
import GP from "../GP";

type EntryMap = { [key: string]: Entry[] };

export default function useMappedEntries(): {
    isOnline: boolean;
    eventDays: string[];
    mappedEntries: EntryMap;
    getDayEntries: (day: Date) => (Entry[]);
    updateMappedEntry: (oldEntry: Entry, newEntry: Entry) => void;
    addMappedEntry: (entry: Entry) => void;
    deleteMappedEntry: (entry: Entry) => void
} {

    const [isOnline, setIsOnline] = useState<boolean>(true);
    const [eventDays, setEventDays] = useState<string[]>([]);
    const [mappedEntries, setMappedEntries] = useState<EntryMap>({});

    const setData = (data: Entry[]) => {
        const mapObject: EntryMap = {};
        const eventDaysBuilder: string[] = [];

        data.forEach((entry: Entry) => {
            const newEntry = Entry.plainToEntry(entry);
            DateUtils.forEachDay(DateUtils.getDayDatetime(newEntry.dateFrom), DateUtils.getDayDatetime(newEntry.dateTo),
                (day, dayTimestamp) => {
                    const key = DateUtils.timestampToKey(dayTimestamp);
                    if (!mapObject.hasOwnProperty(key)) {
                        mapObject[key] = [];
                    }
                    if (!eventDaysBuilder.includes(DateUtils.formatDate(day))) {
                        eventDaysBuilder.push(DateUtils.formatDate(day));
                    }
                    mapObject[key].push(newEntry);
                })
        });

        setEventDays(eventDaysBuilder);
        setMappedEntries(mapObject);
    }

    useEffect(() => {
        async function fetchData() {
            await axios.get<Entry[]>(GP.getBaseServerURL() + '?k=' + GP.getKey())
                .then(({data}) => {
                    setData(data);
                })
                .catch(() => {
                    setIsOnline(false);
                });
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
                const key = DateUtils.timestampToKey(dayTimestamp);
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
                const key = DateUtils.timestampToKey(dayTimestamp);
                mapObject[key] = mapObject[key].filter((e: Entry) => (e.id !== entry.id));
            });
        return {...mapObject};
    }

    const updateMappedEntry = (oldEntry: Entry, newEntry: Entry) => {
        const mapObject = _deleteMappedEntry(oldEntry, mappedEntries);
        setMappedEntries(_addMappedEntry(newEntry, mapObject));
    }

    const getDayEntries = (day: Date) => {
        const key = DateUtils.timestampToKey(DateUtils.getDayDatetime(day).getTime());
        if (mappedEntries.hasOwnProperty(key)) {
            return mappedEntries[key];
        }
        return [];
    }

    return {isOnline, eventDays, mappedEntries, getDayEntries, addMappedEntry, updateMappedEntry, deleteMappedEntry};
}