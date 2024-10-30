import React, { lazy } from "react";

import { PageProps } from "./types";

import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const defaultPage = {
	sections: [
		IntroContent,
		MiddleBlockContent,
		AboutContent,
		MissionContent,
		ProductContent,
		ContactContent
	]
};

const Remote = ({ page = defaultPage }: { page?: PageProps }) => {

	return (
		<Container>
			<ScrollToTop />
			{
				page?.sections?.map((section, i) =>
					section.type == "content" ? ((section.direction == "left" || section.direction == "right") ?
						<ContentBlock key={section.id ?? i} title={section.title} content={section.text} id={section?.id ?? i+""} icon={section.icon} direction={section.direction} button={section.button} section={section.section} /> :
						<MiddleBlock key={section.id ?? i} title={section.title} content={section.text} button={section.button} />
					) : (
						section.type == "form" &&
						<Contact key={section.id ?? i} title={section.title} content={section.text} id={section?.id ?? i+""} />
					)
				)
			}
		</Container>
	);
};

export default Remote;
