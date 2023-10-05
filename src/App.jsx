import React from "react";
import {getInitialData, showFormattedDate} from "./utils/index.js";
import Card from "./components/Card.jsx";
import Form from "./components/Form.jsx";

const STORAGE_KEY = 'MYNOTE';

function isStorageExist() /* boolean */ {
    if (typeof Storage === 'undefined') {
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(serializedData);
}

class App extends React.Component {
    constructor(props) {
        super(props);

        if (isStorageExist()) {
            const storedData = loadDataFromStorage();
            if (storedData !== null) {
                this.state = {
                    notes: storedData,
                    searchKeyword: '',
                };
            } else {
                const initialData = getInitialData();
                const parsedData = JSON.stringify(initialData);
                localStorage.setItem(STORAGE_KEY, parsedData);
                this.state = {
                    notes: initialData,
                    searchKeyword: '',
                };
            }
        } else {
            this.state = {
                notes: [],
                searchKeyword: '',
            };
        }

        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onChangeArchivedHandler = this.onChangeArchivedHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onChangeSearchKeywordHandler = this.onChangeSearchKeywordHandler.bind(this);
    }

    onChangeArchivedHandler(id) {
        this.setState((prevState) => {
            const updatedNotes = prevState.notes.map((note) => {
                if (note.id === id) {
                    return {
                        ...note,
                        archived: !note.archived,
                    };
                }
                return note;
            });

            const parsed = JSON.stringify(updatedNotes);
            localStorage.setItem(STORAGE_KEY, parsed);

            return {
                notes: updatedNotes,
            };
        });
    }

    onDeleteNoteHandler(id) {
        const updatedNotes = this.state.notes.filter(note => note.id !== id);

        const parsed = JSON.stringify(updatedNotes);
        localStorage.setItem(STORAGE_KEY, parsed);

        this.setState({notes: updatedNotes});
    }

    onAddNoteHandler({title, body}) {
        this.setState((prevState) => {
            const newNote = {
                id: +new Date(),
                title,
                body,
                createdAt: +new Date(),
                archived: false,
            };
            const updatedNotes = [...prevState.notes, newNote];

            const parsed = JSON.stringify(updatedNotes);
            localStorage.setItem(STORAGE_KEY, parsed);

            return {
                notes: updatedNotes,
            };
        });
    }

    onChangeSearchKeywordHandler(event) {
        this.setState(() => {
            this.state.notes.filter(note => {
                return note.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase());
            });

            return {
                searchKeyword: event.target.value
            }
        })
    }

    render() {
        return (
            <>
                <header className={'w-screen h-auto text-white'}>
                    <nav
                        className={'flex flex-col lg:flex-row items-center h-full px-10 py-5 lg:py-3 justify-between border-b-white border-b-[1px]'}>
                        <h1 className={'text-3xl font-bold mb-4 lg:mb-0'}>MyNotes</h1>
                        <input type={'text'} className={'form-control w-full lg:w-72'}
                               placeholder={'Cari Catatan'} value={this.state.searhKeyword}
                               onChange={this.onChangeSearchKeywordHandler}/>
                    </nav>
                </header>
                <Form addNote={this.onAddNoteHandler}/>
                <div className={'px-10'}>
                    <div className={'mb-5'}>
                        <h1 className={'text-white text-2xl font-semibold mb-3'}>Catatan Aktif</h1>
                        {this.state.notes && this.state.notes.filter(note => note.archived === false).length > 0 ? (
                            <div className={'grid grid-cols-4 gap-4'}>
                                {
                                    this.state.notes.filter((note) => note.archived === false).map((note) => (
                                        (note.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase()) || !this.state.searchKeyword) &&
                                        <Card key={note.id} id={note.id} title={note.title} description={note.body}
                                              date={showFormattedDate(note.createdAt)}
                                              archived={note.archived} onDelete={this.onDeleteNoteHandler}
                                              onChange={this.onChangeArchivedHandler}/>
                                    ))

                                }
                            </div>
                        ) : (
                            <p className={'text-gray-300 text-center w-full'}>Tidak ada catatan
                            </p>
                        )
                        }
                    </div>
                    <div className={'mb-5'}>
                        <h1 className={'text-white text-2xl font-semibold mb-3'}>Arsip</h1>
                        {this.state.notes && this.state.notes.filter(note => note.archived === true).length > 0 ? (
                            <div className={'grid grid-cols-4 gap-4'}>
                                {
                                    this.state.notes.filter((note) => note.archived === true).map((note) => (
                                        (note.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase()) || !this.state.searchKeyword) &&
                                        <Card key={note.id} id={note.id} title={note.title} description={note.body}
                                              date={showFormattedDate(note.createdAt)}
                                              archived={note.archived} onDelete={this.onDeleteNoteHandler}
                                              onChange={this.onChangeArchivedHandler}/>
                                    ))

                                }
                            </div>
                        ) : (
                            <p className={'text-gray-300 text-center w-full'}>Tidak ada catatan
                            </p>
                        )
                        }
                    </div>
                </div>

            </>
        )
            ;
    }
}

export default App;