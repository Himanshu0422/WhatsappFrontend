import React, { useState } from 'react'
import { SidebarHeader } from './header'
import { Notifications } from './notifications'
import { Search } from './search'
import { Conversations } from './conversations';
import SearchResults from './search/SearchResults.js';

function Sidebar() {

	const [searchResults, setSearchResults] = useState([]);

	return (
		<div className='w-[40%] h-full select-none'>
			<SidebarHeader />
			<Notifications />
			<Search searchLength={searchResults.length} setSearchResults={setSearchResults} />
			{searchResults.length > 0 ? (
				<SearchResults searchResults={searchResults} />
			):(
				<Conversations />
			)}
		</div>
	)
}

export default Sidebar