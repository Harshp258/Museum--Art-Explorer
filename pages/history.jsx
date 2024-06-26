import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { useRouter } from 'next/router';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import React from 'react';
import { removeFromHistory } from '@/lib/userData'; 

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    if (!searchHistory) return null; 

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        e.stopPropagation();
        router.push(`/artwork?${searchHistory[index]}`);
    };

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[index])); 
    };

    return (
        <div className="mt-5">
            <Card>
                    <Card.Body>
            {parsedHistory.length === 0 ? (
                
                        <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
                   
            ) : (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item 
                            key={index} 
                            className={styles.historyListItem} 
                            onClick={(e) => historyClicked(e, index)}
                        >
                            {Object.keys(historyItem).map((key, index) => (
                                <React.Fragment key={`${key}-${index}`}>
                                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                </React.Fragment>
                            ))}
                            <Button 
                                className="float-end" 
                                variant="danger" 
                                size="sm" 
                                onClick={(e) => removeHistoryClicked(e, index)}
                            >
                                &times;
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
             </Card.Body>
                </Card>
        </div>
    );
}
