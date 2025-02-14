<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // List all tasks (with filters for category and status)
    public function index(Request $request)
    {
        $query = Task::query();

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->get(), 200);
    }

    // Create a new task
    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:pending,completed',
            'due_date' => 'nullable|date',
        ]);

        $task = Task::create($request->all());

        return response()->json($task, 201);
    }

    // Mark task as completed
    public function updateStatus($id)
    {
        $task = Task::findOrFail($id);
        $task->status = 'completed';
        $task->save();

        return response()->json(['message' => 'Task marked as completed!'], 200);
    }
}