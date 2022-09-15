import React from 'react';
import useSegmentsWithPages from '../useSegmentsWithPages';

const Navbar = ({ items }) => {
  const wp = useSegmentsWithPages();

  const renderSegments = (a) =>
    Array.isArray(a) && a.length ? (
      <ul>
        {a.map((seg) => (
          <li>
            {seg.label}
            {renderSegments(seg.segments)}
          </li>
        ))}
      </ul>
    ) : null;

  return Object.entries(items).map(
    ([parentTitle, menuItems]) => (
      <>
        <p>
          <strong>{parentTitle}</strong>
        </p>
        <ul>
          {wp(menuItems).map((item) => (
            <li>
              {item.label}
              {renderSegments(item.segments)}
            </li>
          ))}
        </ul>
      </>
    ),
  );
};

export default Navbar;
