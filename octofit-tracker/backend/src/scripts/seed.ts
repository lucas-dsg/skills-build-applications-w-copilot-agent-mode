import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Alex Morgan', email: 'alex.morgan@example.com', weeklyGoal: 4 },
      { name: 'Jordan Lee', email: 'jordan.lee@example.com', weeklyGoal: 5 },
      { name: 'Sam Rivera', email: 'sam.rivera@example.com', weeklyGoal: 3 },
    ]);

    const teams = await Team.create([
      { name: 'Summit Striders', motto: 'Climb higher together', members: [users[0]._id, users[1]._id] },
      { name: 'Morning Momentum', motto: 'Start strong, finish stronger', members: [users[2]._id] },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 42,
        distanceKm: 6.4,
        calories: 510,
        completedAt: new Date('2026-09-28T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 55,
        distanceKm: 18.2,
        calories: 620,
        completedAt: new Date('2026-09-29T17:45:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Strength',
        durationMinutes: 35,
        distanceKm: 0,
        calories: 280,
        completedAt: new Date('2026-09-30T06:45:00Z'),
      },
    ]);

    await Leaderboard.create([
      { user: users[1]._id, points: 1240, rank: 1, period: 'September 2026' },
      { user: users[0]._id, points: 1085, rank: 2, period: 'September 2026' },
      { user: users[2]._id, points: 860, rank: 3, period: 'September 2026' },
    ]);

    await Workout.create([
      {
        title: 'Foundation Flow',
        description: 'A balanced mobility and core session for building consistency.',
        difficulty: 'beginner',
        durationMinutes: 20,
        focus: 'Mobility and core',
      },
      {
        title: 'Tempo Builder',
        description: 'Intervals designed to improve running pace and aerobic capacity.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        focus: 'Cardio endurance',
      },
      {
        title: 'Power Circuit',
        description: 'A demanding full-body circuit for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 45,
        focus: 'Strength and power',
      },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, 3 activities, 3 leaderboard entries, and 3 workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
