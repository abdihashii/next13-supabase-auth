'use client';

import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const SignOut = () => {
  const supabase = createClientComponentClient();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(`Error signing out: ${error.message}`);
    }
  }

  return (
    <button
      className="w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      type="button"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default SignOut;
