import { Hono } from "hono";
import "./types";
import { cors } from "hono/cors";
import { getCookie, setCookie } from "hono/cookie";
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

// OAuth and Authentication endpoints
app.get('/api/oauth/google/redirect_url', async (c) => {
  const redirectUrl = await getOAuthRedirectUrl('google', {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get('/api/logout', async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === 'string') {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// Game API endpoints
app.get('/api/puzzles/:stage', async (c) => {
  const stage = parseInt(c.req.param('stage'));
  
  if (isNaN(stage) || stage < 1 || stage > 3) {
    return c.json({ error: 'Invalid stage' }, 400);
  }

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM puzzles WHERE stage = ? ORDER BY id"
  ).bind(stage).all();

  return c.json(results[0] || null);
});

app.get('/api/progress', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: 'User not found' }, 401);
  }
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM user_progress WHERE user_id = ? ORDER BY stage"
  ).bind(user.id).all();

  return c.json(results);
});

app.post('/api/progress', authMiddleware, async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: 'User not found' }, 401);
  }
  const body = await c.req.json();
  
  const { stage, completed_puzzles, current_stage_progress, is_completed } = body;

  // Check if progress exists for this user and stage
  const { results: existing } = await c.env.DB.prepare(
    "SELECT id FROM user_progress WHERE user_id = ? AND stage = ?"
  ).bind(user.id, stage).all();

  if (existing.length > 0) {
    // Update existing progress
    await c.env.DB.prepare(
      "UPDATE user_progress SET completed_puzzles = ?, current_stage_progress = ?, is_completed = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND stage = ?"
    ).bind(completed_puzzles, current_stage_progress, is_completed ? 1 : 0, user.id, stage).run();
  } else {
    // Create new progress
    await c.env.DB.prepare(
      "INSERT INTO user_progress (user_id, stage, completed_puzzles, current_stage_progress, is_completed) VALUES (?, ?, ?, ?, ?)"
    ).bind(user.id, stage, completed_puzzles, current_stage_progress, is_completed ? 1 : 0).run();
  }

  return c.json({ success: true });
});

export default app;
