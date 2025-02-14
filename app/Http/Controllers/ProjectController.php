<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // List all projects (with optional due_date filter)
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->has('due_date')) {
            $query->where('due_date', $request->due_date);
        }

        return response()->json($query->get(), 200);
    }

    // Create a new project
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        $project = Project::create($request->all());

        return response()->json($project, 201);
    }
}