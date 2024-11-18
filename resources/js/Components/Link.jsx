/**
 * Link - Tailwind UI Catalyst Link Component
 *
 * Wraps links in DataInteractive to add data-focus and data-hover attributes.
 *
 * Maybe: Update this component to use your client-side framework's link
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import * as Headless from "@headlessui/react";
import React, { forwardRef } from "react";

export const Link = forwardRef(function Link(props, ref) {
    return (
        <Headless.DataInteractive>
            <a {...props} ref={ref} />
        </Headless.DataInteractive>
    );
});
