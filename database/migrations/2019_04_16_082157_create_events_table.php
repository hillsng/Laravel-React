<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('location');
            $table->string('image')->nullable();
            $table->date('start_date')->nullable();
            $table->time('start_time')->nullable();
            $table->date('end_date')->nullable();
            $table->time('end_time')->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('organiser_id')->nullable();
            $table->text('organiser_description')->nullable();
            $table->unsignedInteger('category_id')->nullable();
            $table->unsignedInteger('ticket_type_id')->nullable();
            $table->enum('event_type', ['public', 'private'])->nullable();
            $table->unsignedInteger('remaining_tickets')->nullable();
            $table->unsignedInteger('status')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('organiser_id')->references('id')->on('organisers')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('ticket_type_id')->references('id')->on('ticket_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
