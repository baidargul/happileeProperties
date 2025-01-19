import BreadcrumbOne from '@/components/common/breadcrumb/BreadcrumbOne'
import FooterFive from '@/layouts/footers/FooterFive'
import HeaderFour from '@/layouts/headers/HeaderFour'
import React from 'react'

export default function QuestionAndContactInformation() {
  return (
	<>
	<HeaderFour/>
         <BreadcrumbOne title="Question & Contact Information" link="#" link_title="Pages" sub_title="Question & Contact Information" style={false} />
         <div className="container my-5">
  <h1 className="text-center mb-4">Question & Contact Information</h1>
  <p>If you would like to access, correct, amend, or delete any personal information we have about you, register a complaint, or simply want more information, contact our Privacy Compliance Officer at happileepropertysolutions@gmail.com or by mail at:
 <strong> HAPPILEE PROPERTY SOLUTIONS PRIVATE LIMITED</strong> , Pune, Maharashtra, India
</p>
  </div>


         <FooterFive />
	</>
  )
}
