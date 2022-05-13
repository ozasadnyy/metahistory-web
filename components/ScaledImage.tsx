import Imgix from 'react-imgix';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind.config';
import { Breakpoint as MaterialBreakpoint, Theme, useTheme } from '@mui/material';

type TailwindBreakpoint = 'mobile' | 'tablet' | 'laptop' | 'desktop';

export type Breakpoint = TailwindBreakpoint | MaterialBreakpoint;

export type BreakpointRatios = {
  lowerBound: Breakpoint;
  ratio: number;
}[];

function isMaterialBreakpoint(breakpoint: Breakpoint, theme: Theme): breakpoint is MaterialBreakpoint {
  return breakpoint in theme.breakpoints.values;
}

function getBreakpointValue(breakpoint: Breakpoint, materialTheme: Theme): number {
  return isMaterialBreakpoint(breakpoint, materialTheme)
    ? materialTheme.breakpoints.values[breakpoint]
    : parseInt((resolveConfig(tailwindConfig).theme.screens as any)[breakpoint]);
}

function applyRatio(ratio: number, value: string): string {
  const match = value.match(/^(?<number>\d+)(?<unit>[a-z]+)$/);
  if (!match) {
    throw new Error(`"${value}" is not in the format NUMBER + UNIT as expected`);
  }
  return Math.round(Number(match.groups!.number) * ratio) + match.groups!.unit!;
}

function ratioToViewport(ratio: number): string {
  return applyRatio(ratio, '100vw');
}

function pixels(value: number): string {
  return `${value}px`;
}

function lowerBoundCondition(bound: number): string {
  return `(min-width: ${pixels(bound)})`;
}

type ScaledImageProps = {
  src: string;
  alt?: string;
  className?: string;
  breakpoints?: BreakpointRatios;
};

function ScaledImage({
  src,
  alt,
  className,
  breakpoints,
}: ScaledImageProps) {
  const defaultRatio = 1;
  const materialTheme = useTheme();
  const pixelBreakpoints = (breakpoints || []).map(({lowerBound, ratio}) => ({
    lowerBound: getBreakpointValue(lowerBound, materialTheme),
    ratio,
  })).sort(({lowerBound: a}, {lowerBound: b}) => b - a);
  const desktopWidth = getBreakpointValue('desktop', materialTheme);
  return (
      <Imgix
          src={src}
          htmlAttributes={{alt}}
          className={className}
          sizes={[
            ...(pixelBreakpoints.length === 0 || pixelBreakpoints[0]!.lowerBound <= desktopWidth ? [
              `${lowerBoundCondition(desktopWidth)} ${applyRatio(pixelBreakpoints.length > 0
                ? pixelBreakpoints[0]!.ratio
                : defaultRatio, `${pixels(desktopWidth)}`)}`
            ] : []),
            ...pixelBreakpoints.map(({lowerBound, ratio}) =>
              `${lowerBoundCondition(lowerBound)} ${ratioToViewport(ratio)}`),
            ratioToViewport(defaultRatio),
          ].join(', ')}
      />
  );
}

export default ScaledImage;
