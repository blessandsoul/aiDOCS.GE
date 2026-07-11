'use client';

import { DocsToRow } from '@/features/showcase/DocsToRow';
import { DocsSplit } from '@/features/showcase/DocsSplit';
import { DocsScans } from '@/features/showcase/DocsScans';

/* =========================================================================
   LandingShowcase: the aiDOCS product slot.

   Three sections, and the order is the argument:

     1. Watch a receipt become a row. The signature. Everyone in this category stops at the
        extracted JSON. Nobody is buying JSON. The bookkeeper is buying a posted row, so the
        row is the hero and the extraction is treated as the commodity it is.
     2. Sort your own pile, and we tell you which half you should not pay us for. Half of our
        addressable scope is already free inside rs.ge, we say so on our own sales page, and
        that single admission does more for our credibility than any accuracy claim could.
     3. The same receipt four ways, including the handwritten one that defeats us. We show the
        failure on purpose, because a buyer who has been burned before converts on a limit he
        can check, not on a percentage he cannot.
   ========================================================================= */

export function LandingShowcase() {
  return (
    <div id="showcase" className="landing-showcase">
      <DocsToRow />
      <DocsSplit />
      <DocsScans />
    </div>
  );
}
