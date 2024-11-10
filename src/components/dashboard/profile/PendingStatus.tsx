import React from 'react'

export default function PendingStatus() {
  return (
	<div className="bg-white p-30 card-box border-20">
            <h4 className="text-center">Your Profile is being verified</h4>
			<div className='w-100 text-center d-flex flex-column gap-0 mt-50'>
				<p className='m-0'><small>You can mail us at <a className='text-sm ' href="mailto:support@happliee.com">support@happliee.com</a> for more info</small></p>
				<p className='m-0'><small>You can contact us at <a className='text-sm ' href="tel:+912346787565"><small>+912346787565</small></a> for more info</small></p>
			</div>
	</div>
  )
}
