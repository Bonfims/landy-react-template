
export interface PageProps {
    sections: {
        id?: string;
        type: "content" | "form" | "media" | any;
        title: string;
        text: string;
        section?: any[];
        icon?: any;
        direction?: "left" | "right" | any;
        button?: string | any[];
    }[];
}
  