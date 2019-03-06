<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSchedulePost;
use App\Schedule;

class SchedulesController extends Controller
{
    public function index()
    {
        $schedules = Schedule::all();

        return response()->json([
           'schedules' => $schedules->toArray()
        ]);
    }

    public function save(StoreSchedulePost $request)
    {
        $schedule = (new Schedule())->fill($request->only(
            'start_date',
            'title',
            'body'
        ));
        if (!$schedule->save()) {
            return response()->json([
                'error' => '保存に失敗しました'
            ]);
        }

        $schedules = Schedule::all();

        return response()->json([
            'schedules' => $schedules->toArray()
        ]);
    }
}
