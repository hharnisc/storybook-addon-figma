import { StoryDecorator } from 'storybook__react';

interface Options {
	url: string;
}

export default function (options: Options): StoryDecorator;
export function WithFigma(): React.Component<Options,{}>;
