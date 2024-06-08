declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}

type SVG = React.SVGProps<SVGSVGElement>;
type SVGIconFC = React.FC<SVG>;
type SearchParams = Readonly<URLSearchParams>;

type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
