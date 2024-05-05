import React, {useState} from "react";

const SimpleAccordion = ({title = 'Simple Accordion', expanded = false, children}) => {

	const [accordionExpand, setAccordionExpand] = useState(expanded);

	return (
		<>
			<div className="accordion p-15" id="accordionExample">
				<div className="accordion-item">
					<h2 className="accordion-header" id="headingOne">
						<button
							className={`accordion-button ${accordionExpand ? 'collapsed' : ''}`} type="button"
							onClick={() => setAccordionExpand(!accordionExpand)}
						>
							{title}
						</button>
					</h2>
					<div id="collapseOne" className={`accordion-collapse collapse ${accordionExpand ? 'show' : ''}`}>
						<div className="accordion-body">
							{children}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default SimpleAccordion;
