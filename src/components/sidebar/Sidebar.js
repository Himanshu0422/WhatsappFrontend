import React, { useState } from 'react'
import { SidebarHeader } from './header'
import { Notifications } from './notifications'
import { Search } from './search'
import { Conversations } from './conversations';

function Sidebar() {

	const [searchResults, setSearchResults] = useState([]);

	return (
		<div className='w-[40%] h-full select-none'>
			<SidebarHeader />
			<Notifications />
			<Search searchLength={searchResults.length} />
			<Conversations />
		</div>
	)
}

export default Sidebar