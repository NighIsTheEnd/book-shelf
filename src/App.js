import Main from "./main-elements/Main";
import Header from "./main-elements/Header";
import FindBookModel from "./components/findBooks/FindBookModel";
import BookObjKeys from "./BookObjKeys";
import sortFunctions from "./Functions";
import React, { useState, useEffect } from "react";

function App() {
	const [searchTitleKeyWord, setSearchTitleKeyWord] = useState("");
	const [searchAuthorKeyWord, setSearchAuthorKeyWord] = useState("");
	const [useSearchType, setUseSearchType] = useState("");
	const [useSearchKeyWord, setUseSearchKeyWord] = useState(null);
	const [currentSearchPageNumber, setCurrentSearchPageNumber] =
		useState(null);

	const updateTitleKeyWord = (value) => {
		setSearchTitleKeyWord(value);
		console.log(searchTitleKeyWord);
	};

	const updateAuthorKeyWord = (value) => {
		setSearchAuthorKeyWord(value);
		console.log(searchAuthorKeyWord);
	};

	const updateSearchType = (value) => {
		setUseSearchType(value);
	};

	const updateUseSearchKeyWord = (value) => {
		setUseSearchKeyWord(value);
	};

	const updateCurrentSearchPageNumber = (value) => {
		console.log("page updated");
		setCurrentSearchPageNumber(value);
	};

	const sortBackToDefault = (data) => {
		let newBook = sortFunctions.defaultSort(data);
		setSavedBooks(newBook);
	};

	const sortAlphabetically = (data, key) => {
		let newBook = sortFunctions.sortAlphabetically(data, key);
		setSavedBooks(newBook);
	};
	const sortReverseAlphabetically = (data, key) => {
		let newBook = sortFunctions.sortReverseAlphabetically(data, key);
		setSavedBooks(newBook);
	};

	const sortByRating = (data, key) => {
		let newBook = sortFunctions.sortByRating(data, key);
		setSavedBooks(newBook);
	};

	const [savedBooks, setSavedBooks] = useState([
		{
			author: ["J.R.R. Tolkien"],
			id: "1",
			thumbnail:
				"http://books.google.com/books/content?id=yl4dILkcqm4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
			title: "The Lord of the Rings",
			readStatus: "Unread",
			notes: [],
			review: "",
			rating: 1,
			genres: ["Fiction", "Fantasy"],
			isReadNext: true,
			dateAdded: 1663510521482,
		},
		{
			author: ["J.R.R. Tolkien"],
			id: "2",
			thumbnail:
				"http://books.google.com/books/content?id=aWZzLPhY4o0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
			title: "The Fellowship Of The Ring",
			readStatus: "Read",
			notes: [],
			review: "",
			rating: 2,
			genres: ["Fiction"],
			isReadNext: false,
			dateAdded: 1663510510254,
		},
		{
			author: ["Frank Herbert"],
			id: "3",
			thumbnail:
				"http://books.google.com/books/content?id=UAhAEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
			title: "Dune",
			readStatus: "Unread",
			notes: [],
			review: "",
			rating: 0,
			genres: ["Fiction"],
			isReadNext: false,
			dateAdded: 1663510496511,
		},
		{
			author: ["Mark Twain"],
			id: "4",
			thumbnail:
				"http://books.google.com/books/content?id=TeZvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
			title: "The Adventures of Huckleberry Finn",
			readStatus: "Read",
			notes: [],
			review: "",
			rating: 4,
			genres: ["Fiction"],
			isReadNext: false,
			dateAdded: 1663510481022,
		},
		{
			author: ["Brian Jacques"],
			id: 5,
			thumbnail:
				"http://books.google.com/books/content?id=vKGPDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
			title: "Redwall",
			genres: ["Juvenile Fiction"],
			readStatus: "Unread",
			notes: [],
			review: "",
			rating: "",
			isReadNext: false,
			dateAdded: 1663510456738,
		},
		{
			author: ["Ernest Hemingway"],
			id: "6",
			thumbnail:
				"http://books.google.com/books/content?id=rDHuAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
			title: "The Old Man and the Sea",
			genres: ["Fiction"],
			readStatus: "Read",
			notes: [],
			review: "",
			rating: "",
			isReadNext: false,
			dateAdded: 1663510396776,
		},
	]);
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(true);

	const [bookToUpdate, setBookToUpdate] = useState(null);

	const addNoteToBookToUpdateNotes = (newNote) => {
		setBookToUpdate((bookToUpdate) => {
			return {
				...bookToUpdate,
				notes: [newNote, ...bookToUpdate.notes],
			};
		});
	};

	const addReviewToBookToUpdate = (reviewToAdd) => {
		setBookToUpdate((bookToUpdate) => {
			return {
				...bookToUpdate,
				review: reviewToAdd,
			};
		});
	};

	useEffect(() => {}, []);

	const openFilterMenuToggle = () => {
		setIsFilterMenuOpen(!isFilterMenuOpen);
	};

	const addBookToSavedBooks = (bookToAdd) => {
		return setSavedBooks([bookToAdd, ...savedBooks]);
	};

	//-------------passed down to /Main/BookContainer to update state from each BookCard
	const updateReadStatus = (id, value) => {
		return setSavedBooks(
			savedBooks.map((book) =>
				book.id === id
					? {
							...book,
							readStatus: value,
							rating:
								value === BookObjKeys.readStatus.unread
									? ""
									: book.rating,
					  }
					: book
			)
		);
	};

	const updateRating = (id, value) => {
		return setSavedBooks(
			savedBooks.map((book) =>
				book.id === id
					? {
							...book,
							rating: value,
					  }
					: book
			)
		);
	};

	const addNewNote = (id, note) => {
		return setSavedBooks(
			savedBooks.map((book) =>
				book.id === id
					? { ...book, notes: [note, ...book.notes] }
					: book
			)
		);
	};

	const addReview = (id, reviewToAdd) => {
		return setSavedBooks(
			savedBooks.map((book) =>
				book.id === id ? { ...book, review: reviewToAdd } : book
			)
		);
	};

	const updateNoteOnBook = (noteId, updatedNote) => {
		updateBookNotes(noteId, updatedNote);
		updateBookToUpdateNotes(noteId, updatedNote);
	};

	const updateBookNotes = (noteId, updatedNote) => {
		let index = savedBooks.findIndex((book) => book.id === bookToUpdate.id);
		let newNotes = savedBooks[index].notes.map((note) =>
			note.id === noteId ? { ...note, noteText: updatedNote } : note
		);
		return setSavedBooks(
			savedBooks.map((book) =>
				book.id === bookToUpdate.id
					? { ...book, notes: newNotes }
					: book
			)
		);
	};

	const updateBookToUpdateNotes = (noteId, updatedNote) => {
		let newNotes = bookToUpdate.notes.map((note) =>
			note.id === noteId ? { ...note, noteText: updatedNote } : note
		);
		return setBookToUpdate((bookToUpdate) => {
			return {
				...bookToUpdate,
				notes: newNotes,
			};
		});
	};

	const deleteNote = (noteId) => {
		removeBookNote(noteId);
		removeBookToUpdateNote(noteId);
	};

	const removeBookNote = (noteId) => {
		let index = savedBooks.findIndex((book) => book.id === bookToUpdate.id);
		let newNotes = savedBooks[index].notes.filter((note) =>
			note.id !== noteId ? note : null
		);
		console.log(newNotes);
		return setSavedBooks(
			savedBooks.map((book) =>
				book.id === bookToUpdate.id
					? { ...book, notes: newNotes }
					: book
			)
		);
	};

	const removeBookToUpdateNote = (noteId) => {
		let newNotes = bookToUpdate.notes.filter((note) =>
			note.id !== noteId ? note : null
		);
		return setBookToUpdate((bookToUpdate) => {
			return {
				...bookToUpdate,
				notes: newNotes,
			};
		});
	};

	const updateReadNext = (id, value) => {
		return setSavedBooks(
			savedBooks.map((book) =>
				book.id === id ? { ...book, isReadNext: !value } : book
			)
		);
	};

	return (
		<div className="App">
			<FindBookModel
				useSearchType={useSearchType}
				useSearchKeyWord={useSearchKeyWord}
				currentSearchPageNumber={currentSearchPageNumber}
				updateCurrentSearchPageNumber={updateCurrentSearchPageNumber}
				addBookToSavedBooks={addBookToSavedBooks}
			/>
			<Header />
			<Main
				//------passing state
				searchTitleKeyWord={searchTitleKeyWord}
				searchAuthorKeyWord={searchAuthorKeyWord}
				savedBooks={savedBooks}
				isFilterMenuOpen={isFilterMenuOpen}
				bookToUpdate={bookToUpdate}
				setBookToUpdate={setBookToUpdate}
				//--------passing functions

				updateSearchType={updateSearchType}
				updateUseSearchKeyWord={updateUseSearchKeyWord}
				updateCurrentSearchPageNumber={updateCurrentSearchPageNumber}
				updateTitleKeyWord={updateTitleKeyWord}
				updateAuthorKeyWord={updateAuthorKeyWord}
				openFilterMenuToggle={openFilterMenuToggle}
				updateReadStatus={updateReadStatus}
				updateRating={updateRating}
				updateReadNext={updateReadNext}
				addNoteToBookToUpdateNotes={addNoteToBookToUpdateNotes}
				addNewNote={addNewNote}
				deleteNote={deleteNote}
				updateNoteOnBook={updateNoteOnBook}
				addReviewToBookToUpdate={addReviewToBookToUpdate}
				addReview={addReview}
				sortBackToDefault={sortBackToDefault}
				sortAlphabetically={sortAlphabetically}
				sortReverseAlphabetically={sortReverseAlphabetically}
				sortByRating={sortByRating}
			/>
		</div>
	);
}

export default App;
